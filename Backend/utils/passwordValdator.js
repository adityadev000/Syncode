function passwordAuthenticate(password) {
    const data = {
        uppercase : "QWERTYUIOPLKJHGFDSAZXCVBNM",
        lowercase : "qwertyuioplkjhgfdsazxcvbnm",
        special_char : "~!@#$%^&*()_+=[{]};:',./<>?",
        number : "1234567890"
    }
    
        //check password condtion 
        let uppercase = false ; 
        let lowercase = false ; 
        let number = false ; 
        let special_char = false ; 

        if(password.length < 8 ){
            return false ; 
        }
        else{
            for(let i = 0 ; i< password.length ; i++  ){
                if(uppercase && lowercase && number && special_char ){
                    break ; 
                }
                const char = password[i] ; 
                for(let j = 0 ; j < data.lowercase.length ; j ++ ){
                    if( char ===  data.lowercase[j] ) {
                        lowercase = true ; 
                    }
                    else if(char === data.uppercase[j] ){
                        uppercase = true ; 
                    }
                }
                for(let j = 0 ; j < data.number.length ; j ++ ){
                    if( char ===  data.number[j] ) {
                        number = true ; 
                    }
                }
                for(let j = 0 ; j < data.special_char.length ; j ++ ){
                    if( char ===  data.special_char[j] ) {
                        special_char = true ; 
                    }
                }
            }
        }
        if(!uppercase || !lowercase || !special_char || !number){
            return false ; 
        }
        else{
            return true ; 
        }
}

module.exports = passwordAuthenticate ; 