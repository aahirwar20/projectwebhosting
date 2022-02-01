var app =angular.module('myapp',[]);
app.controller('myCtrl',function($scope,$http){
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    
    
    var s='/addname?id='+id;
    $http.get(s).then(function(response){
        $scope.firstname=response.data.fname;
        $scope.lastname=response.data.lname;
     
    });
});
var app= angular.module('myfeed',[]);
app.controller('myfeed_ctr',function($scope,$http){
    var s='/add_feed';
    console.log(s);
    $http.get(s).then(function(res){
        $scope.data=res.data.records;
        console.log('res.data.records');
    });
});