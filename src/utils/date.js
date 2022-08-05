exports.toLocal = (date)=>{
    console.log("date is ", date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    

    return(
        new Date(date).toLocaleDateString(undefined , options)
    )

}