// returns an array with products that it found
export function searchForItems(searchQuery, data) {
    // const matchingObjects = [];
    //   //everything has to be lowercase to check if the search value matches
    //   //the value we are trying to look for
    //   //iritate through every object in apiproducts
    //   for (let i = 0; i < data.length; i++) {
    //     //get object
    //     const obj = data[i];
    //     for (let prop in obj) {
    //       //chceck if field is an array in object
    //       if (Array.isArray(obj[prop])) {
    //         //check if it includes the value
    //         if (obj[prop].toLowerCase().includes(searchQuery.toLowerCase())) {
    //           //if so, push the object into matching objects
    //           matchingObjects.push(obj);
    //           break;
    //         }
    //       } else {
    //         if (obj[prop].toLowerCase().includes(searchQuery.toLowerCase())) {
    //           matchingObjects.push(obj);
    //           break;
    //         }
    //       }
    //     }
    //   }
    // return matchingObjects

    const matchingObjects = [];

    // Iterate through every object in data
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
  
      // Check if any of the object's properties contain the search query
      let isMatch = false;
      for (let prop in obj) {
        let value = obj[prop];
  
        // Convert non-string values to strings
        if (typeof value !== 'string') {
          value = value.toString();
        }
  
        // Check if the property value contains the search query
        if (value.toLowerCase().includes(searchQuery.toLowerCase())) {
          isMatch = true;
          break;
        }
      }
  
      if (isMatch) {
        matchingObjects.push(obj);
      }
    }
  
    return matchingObjects;
}
