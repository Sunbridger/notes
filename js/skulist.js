


this.selectedSKU = this.producytSkuList.find(list => {
    return choosePropertyList.every(property => {
        return list.propertyList.find(item => item.propertyValueCode === this.selectedPropertyGroups[property].propertyValueCode)
    })
});
