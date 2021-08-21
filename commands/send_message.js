module.exports = (chanel, text, duration = 10) => {
    chanel.send(text).then(msg => {
        if(duration === -1){
            return
        }

        setTimeout(() => {
            msg.delete()
        }, 1000 * duration)
    })
}