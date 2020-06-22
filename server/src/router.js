const regForCompression = /^[A-Fa-f]+$/;
const regForDecompression = /^[a-f](?:[a-f0-9]+)*$/i;
const number = /[0-9]/;


module.exports = (app) => {

    app.post('/compress', (req, res) => {
        let inputString = req.body.string.toLowerCase()
        if (!inputString.match(regForCompression)) {
            return res.status(400).send({
                message: "Incorrect input data"
            });
        }

        let inputArr = inputString.split('')
        let newArr = []
        let outputString = ''
        inputArr.forEach((item, index) => {
            if (index === 0) {
                newArr.push([item])
                return
            }
            if (item === inputArr[index - 1]) {
                newArr[newArr.length - 1].push(item)
            } else {
                newArr.push([item])
            }
        })
        newArr.forEach(item => {
            if (item.length <= 2) {

                outputString = outputString.concat(item.join(''))
            } else {
                outputString = outputString.concat(`${item[0]}${item.length}`)
            }
        })

        return res.json({
            string: outputString
        });


    })
    app.post('/decompress', (req, res) => {
        let inputString = req.body.string.toLowerCase()
        if (!inputString.match(regForDecompression)) {
            return res.status(400).send({
                message: "Incorrect input data"
            });
        }

        let inputArr = inputString.split('')
        let newArr = []
        let outputString = ''
        let quantity = ''
        inputArr.forEach((item, index) => {
            if (index === 0) {
                newArr.push([item])
                return
            }
            if (item === inputArr[index - 1] && !item.match(number) && quantity === '') {
                newArr[newArr.length - 1].push(item)
                return
            } else if (item.match(number)) {
                quantity = quantity.concat(item)
                if (index === inputArr.length - 1) {
                    for (let i = 0; i < +quantity - 1; i++) {
                        newArr[newArr.length - 1].push(newArr[newArr.length - 1][0])
                    }
                }
                return
            } else if (!item.match(number) && quantity !== '') {
                for (let i = 0; i < +quantity - 1; i++) {
                    newArr[newArr.length - 1].push(newArr[newArr.length - 1][0])
                }
                quantity = ''
                newArr.push([item])
            } else {
                newArr.push([item])
            }
        })
        newArr.forEach(item => {
            outputString = outputString.concat(item.join(''))

        })

        return res.json({
            string: outputString
        });


    })
}