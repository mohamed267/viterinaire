const extractData = (form)=>{


    let objFields = {}
    let priorities = []
    let extractedData= []

    if(form){
        extractedData = [
            {type : "title"  ,  label : "région" },
           
            {type : "property",
            value : form.wilaya ? form.wilaya.wilaya_name ?
            form.wilaya.wilaya_name :"N/A":"N/A" , name : "wilaya"},
            {type : "property",
            value : form.daira ? form.daira.daira_name ?
            form.daira.daira_name :"N/A":"N/A" , name : "daira"},
            {type : "property",
            value : form.commune ? form.commune.commune_name ?
            form.commune.commune_name :"N/A":"N/A" , name : "commune"},
        ]



        let address_fields = form && form.address_fields
        let string_fields = form && form.string_fields
        let boolean_fields = form && form.boolean_fields
        let number_fields = form && form.number_fields
        let text_fields =  form && form.text_fields
        let date_fields =  form && form.date_fields


        console.log("address field are ", address_fields)

        address_fields && address_fields.map(field=>{
            let address = field.address;
            let form_field = field.form_field
            let form_field_name = form_field.form_field_name
            let lat = field.lat;
            let lng = field.lng;
            /*-------*/
            let field_group = form_field.field_group
            let field_group_slug = field_group.field_group_slug
            let field_group_name = field_group.field_group_name
            let priority  = new Date(field_group.createdAt).getTime()

            if(!objFields[priority]){
                objFields[priority] = {};
                objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
                objFields[priority].fields = [];
                priorities.push(priority)
            }

            if(lat && lng){
                
                objFields[priority].fields.push({
                    type : "gps",
                    name: form_field_name,
                    value : `${lat},${lng}`,
                })

            }else{
                 
                objFields[priority].fields.push({
                    type : "property",
                    name : form_field_name,
                    value : address ? address :"N/A" , 
                    name : form_field_name ,
                })

            }
        })

        string_fields && string_fields.map(field=>{
            let value = field.field_value
            value = typeof(value) == "string" ? value.split("_*_").join(" ") : ""
            
            value = field.field_value ?field.field_value : "N/A"

            let form_field = field.form_field
            let form_field_name = form_field.form_field_name
            /*-------*/
            let field_group = form_field.field_group
            let field_group_slug = field_group.field_group_slug
            let field_group_name = field_group.field_group_name
            let priority  = new Date(field_group.createdAt).getTime()

            if(!objFields[priority]){
                objFields[priority] = {};
                objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
                objFields[priority].fields = [];
                priorities.push(priority)
            }

            objFields[priority].fields.push({
                type : "property",
                value : value , name : form_field_name ,
            })
        })


        text_fields && text_fields.map(field=>{
            
            let value = field.field_value ?field.field_value : "N/A"

            let form_field = field.form_field
            let form_field_name = form_field.form_field_name
            /*-------*/
            let field_group = form_field.field_group
            let field_group_slug = field_group.field_group_slug
            let field_group_name = field_group.field_group_name
            let priority  = new Date(field_group.createdAt).getTime()

            if(!objFields[priority]){
                objFields[priority] = {};
                objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
                objFields[priority].fields = [];
                priorities.push(priority)
            }

            objFields[priority].fields.push({
                type : "text",
                value : value , name : form_field_name ,
            })
        })

        number_fields && number_fields.map(field=>{
            let value = field.field_value 

            let form_field = field.form_field
            let form_field_name = form_field.form_field_name
            /*-------*/
            let field_group = form_field.field_group
            let field_group_slug = field_group.field_group_slug
            let field_group_name = field_group.field_group_name
            let priority  = new Date(field_group.createdAt).getTime()

            if(!objFields[priority]){
                objFields[priority] = {};
                objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
                objFields[priority].fields = [];
                priorities.push(priority)
            }

            objFields[priority].fields.push({
                type : "property",
                value : value , 
                name : form_field_name ,
            })
        })

        boolean_fields && boolean_fields.map(field=>{
            let value = field.field_value

            let form_field = field.form_field
            let form_field_name = form_field.form_field_name


            /*-------*/
            let field_group = form_field.field_group
            let field_group_slug = field_group.field_group_slug
            let field_group_name = field_group.field_group_name
            let priority  = new Date(field_group.createdAt).getTime()

            if(!objFields[priority]){
                objFields[priority] = {};
                objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
                objFields[priority].fields = [];
                priorities.push(priority)
            }


            objFields[priority].fields.push({
                type : "property",
                value : value ? 'oui' : 'non' , 
                name : form_field_name ,
            })
        })

        date_fields && date_fields.map(field=>{
            let value = field.field_value ?field.field_value : "N/A"

            let form_field = field.form_field
            let form_field_name = form_field.form_field_name
            /*-------*/
            let field_group = form_field.field_group
            let field_group_slug = field_group.field_group_slug
            let field_group_name = field_group.field_group_name
            let priority  = new Date(field_group.createdAt).getTime()

            if(!objFields[priority]){
                objFields[priority] = {};
                objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
                objFields[priority].fields = [];
                priorities.push(priority)
            }

            objFields[priority].fields.push({
                type : "date",
                value : value , 
                name : form_field_name ,
            })
        })

    }



    priorities.sort()


    priorities.forEach(priority=>{
        let group =  objFields[priority]
        extractedData.push(group.group)
        extractedData = [...extractedData , ...group.fields]

    })



    
    return extractedData


    
    

}




    




const extractForm = (form_fields)=>{
    
    let objFields = {}
    let priorities = []
    form_fields && form_fields.map(form_field=>{
        let field_group = form_field.field_group
        let field_group_slug = field_group.field_group_slug
        let field_group_name = field_group.field_group_name
        let priority  = new Date(field_group.createdAt).getTime()
        if(!objFields[priority]){
            objFields[priority] = {};
            objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
            objFields[priority].fields = [];
            priorities.push(priority)
        }

        
        let form_field_id = form_field.form_field_id
        let form_field_name = form_field.form_field_name
        let form_field_type = form_field.form_field_type
        let field_options =  form_field.field_options
        /*-------*/

        let type = ""
        let typeInput = ""
        let xl = 6

       if(form_field_type =="STRING"){
            type = "input"
            typeInput = "text"
        }else if(form_field_type =="TEXT"  ){
            type = "textarea";
            xl = 12;
        }else if(form_field_type =="NUMBER"  ){
            type = "input"
            typeInput = "number"
        }else if(form_field_type =="DATE"  ){
            type = "input"
            typeInput = "date"
        }
        if(form_field_type =="SELECT"){
            objFields[priority].fields.push( {
                type : "select", 
                label : form_field_name ,
                field : form_field_id.toString(),
                name: `${form_field_name}__${form_field_id}`,
                options : {
                    label :"field_option_value" ,
                    value : "field_option_id", 
                    options : field_options ? field_options :[] 
                },      
                // icon : "las la-lock input-icon",
                placeholder : "",
                xl :6,
                id :  `${form_field_name}__${form_field_id}`
            })

        }else if(form_field_type =="COMPLEXSELECT"){

            objFields[priority].fields.push( {
                type : "select_complex", 
                label : form_field_name ,
                field : form_field_id.toString(),
                name: `${form_field_name}__${form_field_id}`,
                options : {
                    label :"field_option_value" ,
                    value : "field_option_id", 
                    options : field_options ? field_options :[] 
                },      
                // icon : "las la-lock input-icon",
                placeholder : "",
                xl :8,
                id :  `${form_field_name}__${form_field_id}`
            })

        }else if(form_field_type =="ADDRESS"){

            objFields[priority].fields.push( {
                type : "address", 
                label : form_field_name ,
                field : form_field_id.toString(),
                name: `${form_field_name}__${form_field_id}`,   
                // icon : "las la-lock input-icon",
                placeholder : "",
                xl :8,
                id :  `${form_field_name}__${form_field_id}`
            })

        }else if(form_field_type =="GPS"){

            objFields[priority].fields.push( {
                type : "gps", 
                label : form_field_name ,
                field : form_field_id.toString(),
                name: `${form_field_name}__${form_field_id}`,   
                // icon : "las la-lock input-icon",
                placeholder : "",
                xl :8,
                id :  `${form_field_name}__${form_field_id}`
            })

        }else if(form_field_type =="BOOLEAN"){

                objFields[priority].fields.push( {
                    type : "switch", 
                    label : form_field_name ,
                    field : form_field_id.toString(),
                    checkedOn : true,
                    on : form_field_name,
                    off : `non ${form_field_name}`,
                    name: `${form_field_name}__${form_field_id}`,   
                    // icon : "las la-lock input-icon",
                    placeholder : "",
                    xl :4,
                    id :  `${form_field_name}__${form_field_id}`
                })
    
        }else{

            objFields[priority].fields.push({
                type : type, 
                label : form_field_name,
                name: `${form_field_name}__${form_field_id}`,
                typeInput : typeInput,
                field : form_field_id.toString(),
                placeholder : "",
                xl :xl,
                id :  `${form_field_name}__${form_field_id}`,
            })
        }
        
    })


   

    let extractedData= [
        {
            type : 'input', 
            label : "nom de la ferme",
            name: `farme_name`,
            typeInput : "text",
            field : "farm_name",
            xl :6,
            id : "farme_name",
        },
        {
            type : 'input', 
            label : "date de l'enquete",
            name: `date de l'enquète`,
            typeInput : "date",
            field : "date",
            xl :6,
            id : "form_date",
        } , 
        {   
            type : "title"  , 
            slug : "région"  ,
            label : "région" 
        },
        {
            type : "select", 
            label : "region",
            typeSelect : "store",
            field : "region",
            name: "region",
            options : {
                key : "regions",
                where : "region",
                label :  "region_name",
                value :  "region_id"
            } ,        
            placeholder : "saidir votre région",
            xl :4,
            id :  "region"
        },
         {
            type : "select", 
            label : "wilaya",
            typeSelect : "store",
            field : "wilaya",
            name: "wilaya",
            options : {
                key : "wilayas",
                where : "wilaya",
                label :  "wilaya_name",
                value :  "wilaya_id"
            } ,        
            placeholder : "saisir votre wilaya",
            xl :4,
            id :  "wilaya"
        },
        {
            type : "select", 
            label : "daira",
            typeSelect : "store",
            field : "daira",
            name: "daira",
            options : {
                key : "dairas",
                where : "daira",
                label :  "daira_name",
                value :  "daira_id"
            } ,        
            placeholder : "enter your daira",
            xl :4,
            id :  "daira"
        },
        {
            type : "select", 
            label : "commune",
            typeSelect : "store",
            field : "commune",
            name: "commune",
            options : {
                key : "communes",
                where : "commune",
                label :  "commune_name",
                value :  "commune_id"
            } ,        
            placeholder : "enter your commune",
            xl :4,
            id :  "commune"
        }


    ]


    priorities.sort()


    priorities.forEach(priority=>{
        let group =  objFields[priority]
        extractedData.push(group.group)
        extractedData = [...extractedData , ...group.fields]

    })


    extractedData.push(
        {
            xl : 12,
            className:"px-3 my-4",
            fields : [
                {
                    type : "button",
                    className : "w-100 btn--primary",
                    text : "save changes"
                }
            ]
        })
        console.log("our all extrated ", extractedData)
    return {
         type : "row",
        className : "w-100 ",
        fields :  extractedData ? extractedData :[]

    }

}



const dataForm = (form) =>{
    let objData = {}

   

    if(form){
        objData["date"]= new Date(form.date).getTime()
        objData["farm_name"]= form.farm_name
        objData["region"] =  form.region
        objData["wilaya"] =  form.wilaya
        objData["commune"] =  form.commune
        objData["daira"] =  form.daira


        let string_fields = form && form.string_fields

        string_fields && string_fields.map(field=>{
            let value = field.field_value
            let form_field_id  = field.form_field_id

            let form_type = field.form_field.form_field_type
            if(form_type =="COMPLEXSELECT"){
                let field_options = field.form_field.field_options
                let [field_value , extra] = value.split('_*_');

                let filtered = field_options  && field_options.filter(option=>{
                    return (option.field_option_value == field_value)
                })

                let obgVal = filtered[0] ? { ...filtered[0] , extra} : {extra}
                objData[form_field_id.toString()] = obgVal
                
            }
            if(form_type =="SELECT"){
                let field_options = field.form_field.field_options

                let filtered = field_options  && field_options.filter(option=>{
                    return (option.field_option_value == value)
                })

                let obgVal = filtered[0] ? filtered[0]   :{}
                objData[form_field_id.toString()] = obgVal
                
            }

            if(form_type =="STRING"){
                let value = field.field_value
                objData[form_field_id.toString()] = value
                
            }

           

        })



        



        let fields =[] 

        fields = form  && form.text_fields 

        fields && fields.map(field=>{
            let value = field.field_value
            let form_field_id  = field.form_field_id
            objData[form_field_id.toString()] = value
        })
        fields = form  && form.boolean_fields 

        fields && fields.map(field=>{
            let value = field.field_value
            let form_field_id  = field.form_field_id
            objData[form_field_id.toString()] = value
        })
        fields = form  && form.number_fields 


        fields && fields.map(field=>{
            let value = field.field_value
            let form_field_id  = field.form_field_id
            objData[form_field_id.toString()] = value
        })

        let address_fields = form && (form.address_fields )


        address_fields && address_fields.map(field=>{
            let form_field_id  = field.form_field_id
            objData[form_field_id.toString()] = {
                address : field.address,
                lat : field.lat,
                lng : field.lng
            }
        })


        // address_fields && address_fields.map(field=>{
        //     let address = field.address;
        //     let form_field = field.form_field
        //     let form_field_name = form_field.form_field_name
        //     /*-------*/
        //     let field_group = form_field.field_group
        //     let field_group_slug = field_group.field_group_slug
        //     let field_group_name = field_group.field_group_name
        //     let priority  = new Date(field_group.createdAt).getTime()

        //     if(!objFields[priority]){
        //         objFields[priority] = {};
        //         objFields[priority].group = {type : "title"  , slug : field_group_slug  ,label : field_group_name }
        //         objFields[priority].fields = [];
        //         priorities.push(priority)
        //     }

        //     objFields[priority].fields.push({
        //         type : "property",
        //         value : address , name : form_field_name ,
        //     })
        // })
    }



    


    return objData
}


const document = {extractData , extractForm , dataForm}


export default document