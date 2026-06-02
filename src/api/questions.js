import requestQuestions  from "@/uitls/http4";

export const getQuestions = (a,b,c,d) =>{
    return requestQuestions({
        url:'/api.php',
        params:{
            amount:a,
            category:b,
            difficulty:c,
            type:d
        }
    })
}
export const getCategory= () =>{
    return requestQuestions({
        url:'/api_category.php',
        
    })
}