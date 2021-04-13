module.exports = {
    changeToOneDimensionalArray: function(array){
        var oneDimensionalArray = []

        for(var i = 0; i < array.length; i++)
        {
            oneDimensionalArray = oneDimensionalArray.concat(array[i]);
        }
        
        return oneDimensionalArray;
    }
}