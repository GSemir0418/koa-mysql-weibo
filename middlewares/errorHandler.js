module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        await ctx.render('error', {
            error: e.message,
            title: '错误'
        })
    }
}