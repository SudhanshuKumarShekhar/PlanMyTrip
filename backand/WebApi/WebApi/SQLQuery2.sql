select b.id,t.Name, t.Address, b.Name,b.Mobile,b.Date,b.Person,b.TotalPrice from dbo.BookingDetails b
join dbo.TripDetails t  on t.id = b.LocationId where b.logginUserId= 1002
