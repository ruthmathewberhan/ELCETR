
function Iterator(items)
{
  this.items = items
  this.index = 0
}

Iterator.prototype = {
  hasNext: function()
  {
    return this.index < this.items.length
  },
  next: function()
  {
    return this.items[this.index++]
  }
}

