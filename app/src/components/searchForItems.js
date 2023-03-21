// returns an array with products that it found
export function searchForItems(searchQuery, data) {
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
