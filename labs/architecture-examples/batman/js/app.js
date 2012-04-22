// Generated by CoffeeScript 1.3.1
(function() {
  var Alfred,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Alfred = (function(_super) {
    var action, _i, _len, _ref;

    __extends(Alfred, _super);

    Alfred.name = 'Alfred';

    function Alfred() {
      return Alfred.__super__.constructor.apply(this, arguments);
    }

    Alfred.root('todos#all');

    _ref = ['all', 'completed', 'active'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      action = _ref[_i];
      Alfred.route("/" + action, "todos#" + action);
    }

    return Alfred;

  })(Batman.App);

  Alfred.TodosController = (function(_super) {

    __extends(TodosController, _super);

    TodosController.name = 'TodosController';

    function TodosController() {
      TodosController.__super__.constructor.apply(this, arguments);
      this.set('newTodo', new Alfred.Todo({
        done: false
      }));
    }

    TodosController.prototype.all = function() {
      return this.set('currentTodos', Alfred.Todo.get('all'));
    };

    TodosController.prototype.completed = function() {
      this.set('currentTodos', Alfred.Todo.get('done'));
      return this.render({
        source: 'todos/all'
      });
    };

    TodosController.prototype.active = function() {
      this.set('currentTodos', Alfred.Todo.get('active'));
      return this.render({
        source: 'todos/all'
      });
    };

    TodosController.prototype.createTodo = function() {
      var _this = this;
      return this.get('newTodo').save(function(err, todo) {
        if (err) {
          throw err;
        }
        return _this.set('newTodo', new Alfred.Todo({
          done: false,
          name: ""
        }));
      });
    };

    TodosController.prototype.destroyTodo = function(node, event, context) {
      var todo;
      todo = context.get('todo');
      return todo.destroy(function(err) {
        if (err) {
          throw err;
        }
      });
    };

    TodosController.prototype.completeAll = function() {
      return Alfred.Todo.get('all').forEach(function(todo) {
        todo.set('done', true);
        return todo.save(function(err) {
          if (err) {
            throw err;
          }
        });
      });
    };

    TodosController.prototype.clearCompleted = function() {
      return Alfred.Todo.get('done').forEach(function(todo) {
        return todo.destroy(function(err) {
          if (err) {
            throw err;
          }
        });
      });
    };

    TodosController.prototype.toggleEditing = function(node, event, context) {
      var editing, todo;
      todo = context.get('todo');
      editing = todo.set('editing', !todo.get('editing'));
      if (editing) {
        document.getElementById("todo-input-" + (todo.get('id'))).focus();
      }
      if (todo.get('name').trim().length > 0) {
        return todo.save(function(err) {
          if (err) {
            throw err;
          }
        });
      } else {
        return todo.destroy(function(err) {
          if (err) {
            throw err;
          }
        });
      }
    };

    TodosController.prototype.disableEditingUponSubmit = function(node, event, context) {
      if (Batman.DOM.events.isEnter(event)) {
        return context.get('todo').set('editing', false);
      }
    };

    return TodosController;

  })(Batman.Controller);

  Alfred.Todo = (function(_super) {

    __extends(Todo, _super);

    Todo.name = 'Todo';

    function Todo() {
      return Todo.__super__.constructor.apply(this, arguments);
    }

    Todo.encode('name', 'done');

    Todo.persist(Batman.LocalStorage);

    Todo.classAccessor('active', function() {
      return this.get('all').filter(function(todo) {
        return !todo.get('done');
      });
    });

    Todo.classAccessor('done', function() {
      return this.get('all').filter(function(todo) {
        return todo.get('done');
      });
    });

    return Todo;

  })(Batman.Model);

  window.Alfred = Alfred;

  Alfred.run();

}).call(this);
