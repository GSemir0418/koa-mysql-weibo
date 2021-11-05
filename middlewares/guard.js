// 路由守卫
module.exports = async (ctx, next) => {
    if (ctx.state.userId) {
        await ctx.redirect('/user/login')
        return
    }
    await next()
}