// 检查cookie并存到上下文对象的state中
modual.exports = async (ctx, next) => {
    ctx.state.userId = Number(ctx.cookies.get('userId', { signed: true }))
    await next()
}