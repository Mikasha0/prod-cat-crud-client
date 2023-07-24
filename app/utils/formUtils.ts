export function getProductFormData(form: FormData){
    return{
        category : form.get("category") as string,
        product : form.get("product") as string,
        description : form.get("description") as string,
        highlight : form.get("highlight") as string,
        status : form.get("status")as any,
        image : form.get("image") as string,
    };
}