


export function ordenBubble(array){
	let bandera=true
  //let aux
  while (bandera){
    bandera=false
    let j
    for(let i=0;i<array.length-1;i++){
      j=i+1
      if(array[j]<array[i]){
        //aux=array[i]
       // array[i]=array[j]
       // array[j]=aux
        [array[j],array[i]]=[array[i],array[j]]
        bandera=true
        
      }
    }
    
  }
  
  return array}