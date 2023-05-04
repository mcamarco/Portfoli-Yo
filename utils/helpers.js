module.exports = {
    formatDate: (date) => {
        return date.toLocaleDateString()
    },
    compareID: (value1, value2, options) => {
        console.log(value1, value2)
        if (value1 == value2) {
            return options.fn(this)
        } else {
            return
        }
    }
}