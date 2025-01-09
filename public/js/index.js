function isOpen() {
  document.getElementById("nav-list").style.display = "block";
  document.getElementById("menu-line").style.display = "none";
  document.getElementById("menu-x").style.display = "block"
  document.getElementById("ham-menu").style.background = "blue"
  
}

function isClose() {
  document.getElementById("nav-list").style.display = "none";
  document.getElementById("menu-line").style.display = "block";
  document.getElementById("menu-x").style.display = "none"
}


if(isClose() == true){
  
}else{

}

// For handling newsletter error and success messages
document.querySelector("#newsletter").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  console.log("Sending data:", data);

  // Send the data as JSON
  try {
      const response = await fetch('/newsletter', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),  // Send the data as JSON
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
          // Handle success (e.g., show a success message)
          alert(result.message);
          e.target.reset();
      } else {
          // Handle validation errors
          alert(result.errors ? result.errors.join(", ") : result.message);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
  }
});


// For handling firstname, lastname and email error and success messages
document.querySelector("#subscribeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // Clear previous messages
  document.querySelector("#error").innerText = "";
  document.querySelector("#success").innerText = "";

  try {
    // Update the URL to the correct endpoint
    const response = await fetch("/userSubscribe", {  // Change this to match your actual backend route
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send form data as JSON
    });

    // Ensure the response is valid and parsed
    const result = await response.json();
    
    if (response.ok) {
      if (result.success) {
        document.querySelector("#success").innerText = result.message;
        e.target.reset();  // This clears the form
      } else {
        document.querySelector("#error").innerText = result.errors?.join(" ") || result.message;
      }
    } else {
      document.querySelector("#error").innerText = result.errors?.join(" ") || result.message;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    document.querySelector("#error").innerText = "An unexpected error occurred.";
  }
});

// 08034319671 102.201.57.53/32 
function toggleModal(event) {
  const modal = document.getElementById('emailModal');
  if (event && event.target.id === 'emailModal') {
    modal.classList.add('hidden');
  } else {
    modal.classList.toggle('hidden');
  }
}
