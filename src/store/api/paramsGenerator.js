const paramsGenarator = (params, type , special) => {
    let genparamas = {};
    var count = 0
    Object.keys(params).map((key) => {
        if (params[key] !== undefined) {
            
            if (!special) {
                genparamas[key] = params[key]
            } else {
                genparamas[key] = {[type] : params[key]}
            }
        }

    })
    return genparamas
}


export default paramsGenarator