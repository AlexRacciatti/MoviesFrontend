export function paginator(items){

    let totalPages = Math.ceil(items.length / 15);
    
    let response = [];

    for(let i= 0; i < totalPages; i++){
        let slicedArray = items.slice(i * 15, (i + 1) * 15);
        response.push(slicedArray);
    }

    return response;
}
