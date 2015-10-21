Activity.create!([
  {name: "Bouldering"},
  {name: "Multi-Ptich"},
  {name: "Sport Climbing"},
  {name: "Apline Climbing"},
  {name: "Trad Climbing"},
  {name: "Craiging"}
])
Adventure.create!([
  {title: "Berkley Bouldering", description: "Great bouldering close to campus", user_id: 8, lat: 37.8715926, lng: -122.272747, location_name: "Berkeley"},
  {title: "Mikey's Beach", description: "Great Beach Climbing ", user_id: 8, lat: 37.801652, lng: -122.479878, location_name: "Marshall's Beach"},
  {title: "Mt. Whitney East Buttress", description: "Mt. Whitney! ", user_id: 8, lat: 36.5784991, lng: -118.29226, location_name: "Mount Whitney"},
  {title: "Stone Fort Bouldering", description: "Great Bouldering", user_id: 8, lat: 35.2359025, lng: -85.1907904, location_name: "Soddy-Daisy"},
  {title: "Charolete Dome", description: "Amazing CLimbing at elevation. ", user_id: 10, lat: 36.7824365, lng: -118.4806533, location_name: "Charlotte Dome"}
])
AdventureActivity.create!([
  {adventure_id: 39, activity_id: 2},
  {adventure_id: 39, activity_id: 4},
  {adventure_id: 39, activity_id: 5},
  {adventure_id: 40, activity_id: 1},
  {adventure_id: 35, activity_id: 1},
  {adventure_id: 35, activity_id: 2},
  {adventure_id: 35, activity_id: 3},
  {adventure_id: 41, activity_id: 2},
  {adventure_id: 41, activity_id: 5}
])
AdventureFeature.create!([
  {adventure_id: 1, feature_id: 1},
  {adventure_id: 1, feature_id: 2},
  {adventure_id: 17, feature_id: 2},
  {adventure_id: 17, feature_id: 3},
  {adventure_id: 19, feature_id: 2},
  {adventure_id: 19, feature_id: 3},
  {adventure_id: 20, feature_id: 1},
  {adventure_id: 20, feature_id: 2},
  {adventure_id: 30, feature_id: 2},
  {adventure_id: 30, feature_id: 3},
  {adventure_id: 31, feature_id: 2},
  {adventure_id: 31, feature_id: 3},
  {adventure_id: 32, feature_id: 2},
  {adventure_id: 32, feature_id: 3},
  {adventure_id: 34, feature_id: 3},
  {adventure_id: 34, feature_id: 4},
  {adventure_id: 35, feature_id: 25},
  {adventure_id: 35, feature_id: 26},
  {adventure_id: 35, feature_id: 27},
  {adventure_id: 36, feature_id: 27},
  {adventure_id: 36, feature_id: 28},
  {adventure_id: 37, feature_id: 25},
  {adventure_id: 37, feature_id: 29},
  {adventure_id: 38, feature_id: 26},
  {adventure_id: 39, feature_id: 26},
  {adventure_id: 40, feature_id: 25},
  {adventure_id: 41, feature_id: 26}
])
AdventureLike.create!([
  {adventure_id: 35, user_id: 8}
])
Feature.create!([
  {name: "Great Bouldering"},
  {name: "Senic"},
  {name: "add"},
  {name: "add"},
  {name: "add"},
  {name: "Big Mountain"}
])
Follow.create!([
  {followee_id: 10, follower_id: 8},
  {followee_id: 11, follower_id: 8}
])
Image.create!([
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1444847519/nj3b4fztoh9t4pmmxmm1.png", imagable_id: 1, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1444865289/kvhftxn4l0fmhrdpbl6x.jpg", imagable_id: 35, imagable_type: "Adventure"},
  {image_url: "http://i.dailymail.co.uk/i/pix/2014/08/19/1408456139288_wps_16_A_Bay_Area_man_died_while.jpg", imagable_id: 8, imagable_type: "User"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1444949361/v2rmytvlaziu92oezhrt.jpg", imagable_id: 38, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445102950/sjsfpaxxfi2nhrztzhdy.jpg", imagable_id: 39, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445103540/tvtgikbcorvi7cofidhy.jpg", imagable_id: 40, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445133299/11951994_10207622915079891_778820175912263583_n_ohnlth.jpg", imagable_id: 9, imagable_type: "User"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445235275/yloe3hlyvq2rhf3cpo06.jpg", imagable_id: 41, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445365032/kx1ro4nbb34jmxfdfaec.png", imagable_id: 10, imagable_type: "User"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445373639/bexl7uraf4feyieqrm8m.jpg", imagable_id: 11, imagable_type: "User"}
])
List.create!([
  {title: "New List", description: nil, user_id: 10}
])
Review.create!([
  {content: "New", rating: 4, adventure_id: 35, user_id: 8},
  {content: "New", rating: 5, adventure_id: 35, user_id: 8},
  {content: "One star", rating: 1, adventure_id: 35, user_id: 8},
  {content: "New Review", rating: 1, adventure_id: 35, user_id: 8},
  {content: "New Review", rating: 5, adventure_id: 35, user_id: 8},
  {content: "New Review Again! ", rating: 5, adventure_id: 35, user_id: 8},
  {content: "Another New REview!!!! ", rating: 5, adventure_id: 35, user_id: 8},
  {content: "A third new Review", rating: 1, adventure_id: 35, user_id: 8},
  {content: "New Review", rating: 5, adventure_id: 35, user_id: 8},
  {content: "So many Reviews", rating: 5, adventure_id: 35, user_id: 8},
  {content: "New", rating: 5, adventure_id: 35, user_id: 8},
  {content: "Nrew Review", rating: 3, adventure_id: 38, user_id: 8},
  {content: "New Review", rating: 5, adventure_id: 38, user_id: 8},
  {content: "Low Review", rating: 1, adventure_id: 38, user_id: 8},
  {content: "Too much stuff. ", rating: 5, adventure_id: 38, user_id: 8},
  {content: "Even better area", rating: 2, adventure_id: 38, user_id: 8},
  {content: "Best ever", rating: 5, adventure_id: 38, user_id: 8},
  {content: "Best Ever", rating: 5, adventure_id: 38, user_id: 8},
  {content: "Even Better", rating: 5, adventure_id: 38, user_id: 8},
  {content: "New Adventure! ", rating: 5, adventure_id: 38, user_id: 8},
  {content: "New Rating. ", rating: 1, adventure_id: 38, user_id: 8},
  {content: "Awful Review", rating: 1, adventure_id: 38, user_id: 8},
  {content: "Awful", rating: 1, adventure_id: 38, user_id: 8},
  {content: "Total", rating: 1, adventure_id: 38, user_id: 8},
  {content: "bad Review", rating: 1, adventure_id: 35, user_id: 8},
  {content: "new", rating: 5, adventure_id: 39, user_id: 9},
  {content: "New Review", rating: 5, adventure_id: 38, user_id: 9},
  {content: "Great! ", rating: 5, adventure_id: 39, user_id: 9},
  {content: "ji", rating: 5, adventure_id: 39, user_id: 10},
  {content: "New Review", rating: 5, adventure_id: 40, user_id: 10},
  {content: "Good Review", rating: 4, adventure_id: 35, user_id: 10},
  {content: "New Review", rating: 1, adventure_id: 39, user_id: 10}
])
User.create!([
  {name: "Amanda", email: "kristen", password_digest: "$2a$10$iLBtZs9nwEEbnWGWepiUCeHxKsREdTQVKH9exT5RtlmKmZY4Vaby.", session_token: "f1qHgPEw-vtckMFIUF5T_w", location: "", lat: 37.7749295, lng: -122.4194155},
  {name: "new", email: "new", password_digest: "$2a$10$Ffyun8BK3ttC2bIW5CEZGeTKGY0J62TcXIfP9nNjjFuo9m7xxlH8G", session_token: "hNGP3FHSxG5IgG-r_B_Etw", location: "San Francisco, CA", lat: 37.7833, lng: -122.4167},
  {name: "Justin Menestrina", email: "jmenestr@gmail.com", password_digest: "$2a$10$0IrgiN4lGz5eRQQCqQjKe.5NSbbX9ZSsoXix3yFODe/a/gtYWPQWW", session_token: "prMjrpzC8o6h1sGBPDtY4w", location: nil, lat: nil, lng: nil},
  {name: "Bailey Schmidt", email: "bailey", password_digest: "$2a$10$/jOwd2LsG2ZlSKeN3vE7IO4VgNYk5GqnNwY9XQZx5YEv2mgXXwCOm", session_token: "svWMmALYYiRnPd-mj7t3_Q", location: nil, lat: nil, lng: nil}
])
