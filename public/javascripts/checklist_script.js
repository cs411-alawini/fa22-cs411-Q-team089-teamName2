console.log("Client-side code running");

const cards = document.getElementById("accordian").children;
for (var i = 0; i < cards.length; i++) {
  var row = cards[i].children[0].children[0];
  var checklistId = row.children[0].children[0].getAttribute('id');
  var deleteButton = row.children[2].children[0];

  deleteButton.addEventListener('delete', function(e) {
    fetch('/deleteChecklist', {method: 'DELETE'}).then(function(response) {
      if(response.ok) {
        console.log('Deleted Checklist');
        return;
      }
      throw new Error('Request failed.');
    }).catch(function(error) {
      console.log(error);
    })
  });

}