(function() {
    'use strict';

    angular
        .module('app', [
            'angular-simple-chat', 'ngSanitize'
        ])

    .controller('AppController', AppController)
        .service('MockMessagesService', MockMessagesService);

    /* @ngInject */
    function AppController(MockMessagesService, $scope) {
        var vm = this;

        vm.client = new ApiAi.ApiAiClient({accessToken: '6d231a8d02f54c5380df8909a5142b66'});

        vm.you = {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            userName: 'Me',
            date: currentTimestamp()
        };

        vm.messages = MockMessagesService.getMessages();

        vm.sendMessage = function(message) {            
            console.log('sendMessage');
        };

        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');

            var length = vm.messages.length;
            var message = vm.messages[length - 1].text;

            var promise = vm.client.textRequest(message);
            
            
            vm.typing = "Darion is typing ... ";

            promise
              .then(vm.handleResponse)
              .catch(vm.handleError);

        });

        vm.handleResponse = function(serverResponse) {            
            vm.typing = "";
            var resultText = serverResponse.result.fulfillment.speech;            
            var resultImage = "";            
            if (serverResponse.result.fulfillment.messages && serverResponse.result.fulfillment.messages.length) {
                resultImage = serverResponse.result.fulfillment.messages[0].imageUrl;
            };
            
            var msg = "";
            if (resultText && resultText !== '') {
                vm.messages.push({
                    id: makeid(),
                    text: resultText,
                    userId: 'hilsqdhfods5990K226DHS01NOHoh',
                    userName: 'Darion',
                    avatar: '/uploads/darion_avatar.png',
                    date: currentTimestamp()
                });
            } else if(resultImage !== '') {
                vm.messages.push({
                    id: makeid(),
                    image: resultImage,
                    userId: 'hilsqdhfods5990K226DHS01NOHoh',
                    userName: 'Darion',
                    avatar: '/uploads/darion_avatar.png',
                    date: currentTimestamp()
                });
            } else {
                msg = "I'm sorry that's not something I know. Here is a list of something we can talk about: Tell me about you, Who are you, About you, About, Can I have your resume?, Download resume, Resume...";
                vm.messages.push({
                    id: makeid(),
                    text: msg,
                    userId: 'hilsqdhfods5990K226DHS01NOHoh',
                    userName: 'Darion',
                    avatar: '/uploads/darion_avatar.png',
                    date: currentTimestamp()
                });
            }

            $scope.$apply();

        }

        vm.handleError = function(serverError) {
            vm.typing = "";
            console.log(serverError);
        }

    }

    /* @ngInject */
    function MockMessagesService() {
        this.getMessages = getMessages;

        ////////////////

        function getMessages() {
            return [{
                id: '535d625f898df4e80e2a125e0',
                text: "Hi, I'm Darion. Let's chat. I'm a developer, VW bus owner, diver, and lover of all things Dachshund. You can ask me about myself, download my resume, ask about the projects i've worked on, get my social links or just chat!",
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                userName: 'Darion',
                avatar: '/uploads/darion_avatar.png',
                date: currentTimestamp()
            }]
        }
    }

    function makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 25; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function currentTimestamp() {
        var timestamp = Math.round(new Date().getTime());        
        return timestamp
    }

})();
