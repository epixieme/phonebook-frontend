const Notification = ({errorMessage,successMessage}) => {
    if (errorMessage === null) {

      console.log(errorMessage)
      return null
    }

    else if(successMessage === null){
      return null
    }
   
if(errorMessage){

      return (
        <div className='error'>
          {errorMessage}
        </div>
      )
    }
    else {
    return (
          <div className='success'>
          {successMessage}
        </div>
        )
     
  }
}
  

  export default Notification