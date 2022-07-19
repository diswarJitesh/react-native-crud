export default class GlobalConstants {
   static apiUrl = "https://fir-abrasive-hummingbird.glitch.me/";
   static numberRegex = /^\d+$/;
   static emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   static toastOptions = {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 30,
      animationType: "slide-in | zoom-in"
   }
   static toastErrOptions = { ...GlobalConstants.toastOptions, type: 'danger' }
   static screenOptions = {
         headerStyle: {
            backgroundColor: '#19AC52'
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
            alignContent: "center",
            justifyContent: "center"
         }
      }
   
}