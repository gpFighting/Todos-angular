import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text	= '';
  statu = 'all';
  currentdbl = {}
  todos = []
  addtoTodos(){
  	if (!this.text) {
  		return
  	}
  	this.todos.push({todo: this.text, completed: false})
  	this.text = '';
  }
  get toggleAll(){
	return this.todos.every(item=>item.completed)
  }
  set toggleAll(val){
  	this.todos.forEach(item=>item.completed=val)
  }
  remove(item){
  	const index = this.todos.findIndex(ele=>{
  		return ele == item
  	})
  	this.todos.splice(index, 1)
  }
  clear(){
  	this.todos = this.todos.filter(item=>{
  		return item.completed === false
  	})
  }
  get getTodos(){
  	if (this.statu == 'completed') {
  		return this.todos.filter(item=>item.completed)
  	} else if (this.statu == 'active') {
  		return this.todos.filter(item=>!item.completed)
  	} else {
  		return this.todos
  	}
  }
  get left(){
  	return this.todos.filter(item=>!item.completed).length
  }
  dbl(item,e){
  	// console.log(this.currentdbl)
  	// console.log(item)
  	this.currentdbl = item
  }
  saveedit(item,e){
  	if (!e.target.value) {
  		e.target.value = item.todo
  		this.currentdbl = {}
  		return
  	}
  	item.todo = e.target.value
  	this.currentdbl = {}
  }
  esc(e){
  	const {keyCode, target} = e
  	// console.log(keyCode)
  	if (keyCode===27) {
      target.value = this.currentdbl.todo
  		this.currentdbl = null
  	}
  }
  ngOnInit(){
    this.todos = JSON.parse(localStorage.getItem('todos')||'[]')
    this.gethash()
    window.onhashchange = this.gethash
  }
  gethash=()=>{
    this.statu = location.hash.split('/')[1]
  }
  ngDoCheck(){
    localStorage.setItem('todos',JSON.stringify(this.todos))
  }
  // getactive(){
  // 	this.statu = 'active'
  // }
  // getcom(){
  // 	this.statu = 'completed'
  // }
  // getAll(){
  // 	this.statu = 'all'
  // }
}

