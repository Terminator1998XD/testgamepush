function updlb(){
  let xp = score;
  let rec = localStorage['myrecord'];

  if(rec == null){
    localStorage['myrecord'] = xp;
    rec = xp;

	if(lb != null) lb.setLeaderboardScore('lead', parseInt(rec));
  }else {
    rec = parseInt(rec);

    if(xp > rec){
      rec = xp;
      localStorage['myrecord'] = xp;

	 if(lb != null) lb.setLeaderboardScore('lead', parseInt(rec));
    }
  }

  $('.crecord').html(parseInt(xp));
  $('.record').html(parseInt(rec));
}
