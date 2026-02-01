> const res = await fetch('/me');
200 OK
> const { name, status } = await res.json();
{ "name": "Ryan Rana", "status": "wired in" }
> console.log(`${full_bio}`);
> // Press Enter to render full response