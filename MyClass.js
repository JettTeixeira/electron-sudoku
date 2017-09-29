
const MyClass = (function() {

    const _name = new WeakMap();
    const _user = new WeakMap();
    const _password = new WeakMap();

    class MyClass {

        constructor(user, password) {

            // private
            _password.set(name, user, password)
            
            // protected
            this.user = user;

            // public
            this.name = name;
        }
    }

    return MyClass;
})();