var app = angular.module('app', ['ngRoute'])

app.config(function ($routeProvider){
    $routeProvider
        .when('/', { controller: 'PostsCtrl', templateUrl: 'posts.html'})
        .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html'})
        .when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html'})
})

app.controller('ApplicationCtrl', function ($scope){
    $scope.$on('login', function(_, user){
        $scope.currentUser = user
    })
})

app.service('PostsSvc', function($http){
    this.fetch = function(){
        return $http.get('/api/posts')
    }
    this.create = function (post){
        return $http.post('/api/posts', post)
    }
})

app.service('UserSvc', function ($http){
    var svc = this
    svc.getUser = function(){
        var username = $http.get('/api/users', { headers: { 'X-Auth': this.token } } )
        console.log(username)
        return username
    }
    svc.login = function (username, password) {
        return $http.post('/api/sessions',{username: username, password: password})
        .then( function (val) {
            svc.token = val.data
            return svc.getUser()
        })
    }
})

app.controller('LoginCtrl', function ($scope, UserSvc){
    $scope.login = function(username, password){
        
        UserSvc.login(username, password).then( function(response){
            $scope.$emit('login', response.data)
        })
    }    
})

//PostsSvcを作った場合
app.controller('PostsCtrl', function ($scope, PostsSvc) {
    PostsSvc.fetch().success(function(posts){
        $scope.posts = posts
    })
//PostsSvcを作らなかった場合
//app.controller('PostsCtrl', function ($scope, $http) {
//    $http.get('https://socialapp-y-omasa.c9users.io/api/posts')
//    .success(function (posts){
//        $scope.posts = posts
//    })

    $scope.addPost = function () {
        if($scope.postBody){

//PostsSvcを作った場合
            PostsSvc.create({
//PostsSvcを作らなかった場合
            // $http.post('/api/posts', {
            
                 username: 'dickeyxxx',
                 body: $scope.postBody
            }).success(function (newpost){ //POST成功時返ってきたデータを
                $scope.posts.unshift(newpost)   //データをPOSTした時にそのデータをJSONで返す
                                                //仕様なので、それをリスト追加    
                $scope.postBody = null
            })
        }
    }    
})