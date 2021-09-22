# CaseManager.js
CaseManager.js is an open-source dynamic tool that is expected to help people with their punishments commands with Discord.js

This tool requires:
- Discord.js (v13^ recommended)
- megadb

You probably are asking for what is this lib?

CaseManager.js was created for making easier the management of cases, so let's see how it works

Documentation:

Constructor:

```js
 new CaseManager(guildID);
 // Example:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Imagine that here is a reference to the current guild */;
 var Manager = new CaseManager(guild.id);
```
------------------------------------------
CaseManager#guildID:

Basically returns the guildID specified in the constructor, this is almost useless, but its used in the base code of the lib.
```js
CaseManager.guildID
// Example:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Imagine that here is a reference to the current guild */;
 var Manager = new CaseManager(guild.id);
 console.log(Manager.guildID); // Returns 862326061408059424
```
------------------------------------------
CaseManager#db

Returns the megadb database instance that was created basing on guild ID.
```js
CaseManager.db
```
------------------------------------------
CaseManager#getCases

Returns all cases (filtered if a filter is given)
```js
CaseManager.getCases([filter])
// Filter Usage:
[filter] = { type: "punishment_type_to_filter", user: "user_id_to_filter" }
// Example 1:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Imagine that here is a reference to the current guild */;
 var user = /* Imagine that here is a reference to the user */;
 var Manager = new CaseManager(guild.id);
 var user_cases = await Manager.getCases({user: user.id});
// Example 2:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Imagine that here is a reference to the current guild */;
 var Manager = new CaseManager(guild.id);
 var bans = await Manager.getCases({type:"BAN"});
// Example 3:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Imagine that here is a reference to the current guild */;
 var Manager = new CaseManager(guild.id);
 var all_cases = await Manager.getCases();
 ```
------------------------------------------
CaseManager#getCase

Returns the case with the ID specified, if the case doesn't exist, then returns `false`
```js
CaseManager.getCase(CaseID);
// Example 1:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Imagine that here is a reference to the current guild */;
 var case_id = "44";
 var Manager = new CaseManager(guild.id);
 var finalcase = await Manager.getCase(case_id); // Returns the Case object
// Example 2:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Imagine that here is a reference to the current guild */;
 var case_id = "4225";
 var Manager = new CaseManager(guild.id);
 var finalcase = await Manager.getCase(case_id); // Returns false
```
