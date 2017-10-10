String.prototype.delete = function(index, endIndex){
	return this.substring(0,index) + this.substring(endIndex+1, this.length);
};
