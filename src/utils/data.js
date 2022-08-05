const dataProf = (data , field) =>{
  if(field){
    let listField = field.split(".");
    listField.forEach(el=>{
        if(data && data[el]){
            data  = data[el] 
        }else{
            data =  '';
        } 
    })
    return data
   }
   return data
}


const dataFilter = (data ,  field)=>{
    data  =  field.in ? dataProf(data , field.in) ? dataProf(data , field.in) : []  : []
    if(field.where){
        data = data && data.filter(el=>{
            let isTrue =  true;
            Object.keys(field.where).forEach(filt=>{
                if(dataProf(el, filt) !=  field.where[filt]){
                    isTrue = false
                }               
            })
            return isTrue
        })



        return (
            dataProf(data[0], field.field)
        )
        
    }
}

export const exportData = (data , field)=>{
    if(typeof(field)=="string"){
        return dataProf(data, field)
    }else{
        return dataFilter(data, field)
    }
}








export const reformate = (data, field)=>{
    

    let snapData = {}
    if(!field){
        snapData =  data
    }else{
        if(field){
            let listField = field.split(".");
            let slider = {}
            snapData = slider;
            listField.forEach((el, key)=>{
                if(key == listField.length-1 ){
                    slider[el] = data
                }else{              
                    slider[el] = {};
                    slider = slider[el]
                }
                
                
            })
        }
    }

    return snapData

}

