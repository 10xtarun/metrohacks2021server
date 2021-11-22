
const UniversalLexer = require('universal-lexer')
const ImpactData = require('../resources/impact_data.json')

const definitions = [
    {
        "type": "String",
        "value": "Credit"
    },
    {
        "type": "String",
        "value": "withdrawn"
    },
    {
        "type": "String",
        "value": "ATM"
    },
    {
        "type": "String",
        "value": "delivered"
    }
]

const applyLexer = (sms) => {
    try {
        const lexer = UniversalLexer.compile(definitions)
        const countObj = {}
        sms.map(text => {
            text.split(" ").map(str1 => {
                const tokens = lexer(str1)
                if (!tokens.error && tokens != {}) {
                    const key = tokens.tokens[0].data.value.toLowerCase()
                    if (countObj && typeof countObj[key] != "undefined") {
                        const val = countObj[key] + 1
                        countObj[key] = val
                    } else {
                        countObj[key] = 1
                    }
                }
            })
        })
        const responseObj = []
        // impact calculation
        Object.keys(countObj).map(key => {
            responseObj.push(
                {
                    name: key,
                    multiple: ImpactData[key].impact.value * countObj[key],
                    impact: ImpactData[key].impact.text
                }
            )
        })
        return {
            error: null,
            data: responseObj
        }

    } catch (error) {
        console.log(error)
        return {
            error: JSON.stringify(error),
            data: {}
        }
    }
}

module.exports = {
    applyLexer
}