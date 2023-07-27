export function getProductFormData(form: FormData){
    return{
        categoryId : form.get("categoryId") as string,
        name : form.get("name") as string,
        description : form.get("description") as string,
        highlight : form.get("highlight") as string,
        status : form.get("status")as string,
    };
}

export function getCategoryFormData(form: FormData){
    return{
        name : form.get("name") as string,
        status : form.get("status")as string,
    };
}