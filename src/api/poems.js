import requestPoems from "@/uitls/http2";

export const getPoems = () =>{
    return requestPoems({
        url:'',
        params:{
            c:'i',

        }
    })
}