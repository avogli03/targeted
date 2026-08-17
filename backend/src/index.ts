export default {
  register() {},
  async bootstrap({ strapi }) {
    const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
      where: { type: "public" },
      populate: ["permissions"]
    });

    if (!publicRole) return;

    const publicActions = [
      "api::article.article.find",
      "api::article.article.findOne",
      "api::category.category.find",
      "api::category.category.findOne",
      "api::targeted.targeted.find",
      "api::targeted.targeted.findOne"
    ];

    const existingActions = new Set(publicRole.permissions.map((permission) => permission.action));
    const missingActions = publicActions.filter((action) => !existingActions.has(action));

    await Promise.all(
      missingActions.map((action) =>
        strapi.db.query("plugin::users-permissions.permission").create({
          data: {
            action,
            role: publicRole.id
          }
        })
      )
    );
  }
};
