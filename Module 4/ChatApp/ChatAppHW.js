let messages = [
	{ text: "How was school today? :)", now: new Date(), IsMyMessage: false },
];
updateHTML();

//Send
function sendMessage(event) {
	event.preventDefault();
	const messageInput = document.getElementById("messageInput");
	messages.push({
		text: messageInput.value,
		IsMyMessage: true,
		now: new Date(),
	});
	messageInput.value = "";
	updateHTML();

	generateIncomingMessage();
}

//loop & return: print, update, timeout, print, update
function generateIncomingMessage() {
	messages.push({
		text: `........... `,
		IsMyMessage: false,
		now: new Date(),
	});
	updateHTML();

	const secondsToWait = Math.random() * 10;
	setTimeout(function () {
		messages.splice(messages.length - 1, 1);
	
		messages.push({
			text: "Awesome! keep up the great work!",
			IsMyMessage: false,
			now: new Date(),
		});
		updateHTML();
	}, secondsToWait * 1000);  
}

//Formatting Date
let now = new Date();
function formatDate(now) {
    return new Intl.DateTimeFormat('default',
        {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(now);
	}

//Update HTML
function updateHTML() {
	const messagesDiv = document.getElementById("messages");

	let htmlToUpdate = "";

	for (const [index, message] of messages.entries()) {
		if (message.IsMyMessage) {
			htmlToUpdate += 
            `<div class="row message">
                    <div class="col-2"></div>
                    <div class="col-10 text-end">
                        <span class="message-text">${message.text}
                            <a onclick="editMessage(${index})"><i class="fas fa-edit"></i></a>  | 
                            <a onclick="deleteMessage(${index})"><i class="far fa-trash-alt"></i></a>  
                        </span>
                        <div class="time-stamp">${formatDate(message.now)}</div>
                    </div>
                </div>`;
		} else {
			htmlToUpdate += 
            `<div class="row message">
                 <div class="col-10">
                    <span class="message-text user-message-text">${message.text}</span>
                    <div class="time-stamp">${formatDate(message.now)}</div>
                </div>
            </div>`;
		}
	}
	messagesDiv.innerHTML = htmlToUpdate;
}
//Edit Message
function editMessage(index) {
	const updatedMessage = window.prompt("Enter new message");
	messages[index].text = updatedMessage;
	updateHTML();
}

//Delete Message
function deleteMessage(index) {
	if (window.confirm("Are you sure? This action cannont be undone")) {
		messages.splice(index, 1);
		updateHTML();
	}
}

// Search Messages
function search(event) {
	event.preventDefault();
	let searched = document.getElementById("searchField").value.trim();
  if (searched !== "") {
  	let text = document.getElementById("messages").innerHTML;
  	let re = new RegExp(searched,"g");
		let newText = text.replace(re, `<mark>${searched}</mark>`);
		document.getElementById("messages").innerHTML = newText;
  }
}
