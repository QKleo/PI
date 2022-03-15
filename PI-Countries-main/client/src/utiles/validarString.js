

export const validar=(cadena='')=>{
    cadena=cadena.split(' ')
    cadena=cadena.join('')
    let primero=/\W/.test(cadena)
    let segundo=/\d/.test(cadena)
    
    return !primero && !segundo 
  }