Activity.create!([
  {name: "Bouldering"},
  {name: "Multi-Ptich"},
  {name: "Sport Climbing"},
  {name: "Apline Climbing"},
  {name: "Trad Climbing"},
  {name: "Craiging"}
])
[
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445363827/rock_climbing_scene_1_x02odj.png", imagable_id: 1, imagable_type: "User"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445734567/cbjbzdngey2vz8lvfqkf.jpg", imagable_id: 1, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445734570/sla5uytsb1cagayosiii.jpg", imagable_id: 1, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445734575/zpxd4jaee2xnjs05fros.jpg", imagable_id: 1, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445734580/wfykrknab11a0crvrzv4.jpg", imagable_id: 1, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445734584/onymcwhosz7aty8ys4cm.jpg", imagable_id: 1, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445735436/laxlcfctm49ymtizjygy.jpg", imagable_id: 2, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445735439/pabbaipnj2fkz5hxsrjk.jpg", imagable_id: 2, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445735443/lad0j7wzvumwbvevslqj.jpg", imagable_id: 2, imagable_type: "Adventure"},
  {image_url: "http://res.cloudinary.com/climb-california/image/upload/v1445735448/toofizrxuk8y7wll3qma.jpg", imagable_id: 2, imagable_type: "Adventure"}
].each do |image| 
  i = Image.new(image)
  i.save(:validate => false)
end

[
  {title: "Buttermilk Boulders", description: "The scenic and awe-inspiring Buttermilk Country has long been one of California's premier bouldering destinations with a long history of ground-breaking ascents and some of the proudest, boldest, and most aesthetic lines in the world. These massive glacial erratic boulders sit in the foothills of the Sierra Nevada under an impressive backdrop of high peaks just a mere four miles to the west. Granite-like quartz monzonite makes up the boulders featuring sweeping blank faces, polished patina crimps/plates and sharp slopers and edges. Fingers tend to get torn up quickly on the large grain so bring tape if your callouses aren't sufficient.", user_id: 1, lat: 37.2943766, lng: -118.6101148, location_name: "Buttermilk Country"},
  {title: "Happy Bouldering", description: "The Happy Boulders offer highly concentrated world-class volcanic bouldering with hundreds of worthy problems ranging from simple to impossible. The rock, which looks brittle and crumbly with a quick glance is surprisingly bomber volcanic Bishop Tuff, just be weary on high top-outs that may not see much traffic. The boulders found here offer faces that test every technique - most notably is the abundance of finger pockets which are found everywhere. You'll also find steep, gymnastic juggy overhangs and crimpy faces, as well as low traverses and unlimited eliminates and link-ups. Cracks of wide ranges can be found on the rim along with easy and scary highballing... it's all here. The landings are flat, the boulders are jam-packed, and everyone in your posse will find what they're looking for. ", user_id: 1, lat: 37.413638, lng: -118.447648, location_name: "Happy Boulders"}
].each do |adventure| 
  a = Adventure.new(adventure)

  a.save(:validate => false)
end
AdventureActivity.create!([
  {adventure_id: 1, activity_id: 1},
  {adventure_id: 2, activity_id: 1}
])
AdventureFeature.create!([
  {adventure_id: 1, feature_id: 1},
  {adventure_id: 1, feature_id: 2},
  {adventure_id: 1, feature_id: 3},
  {adventure_id: 2, feature_id: 4},
  {adventure_id: 2, feature_id: 5}
])
Feature.create!([
  {name: "Highballs"},
  {name: "Granite"},
  {name: "Great Camping"},
  {name: "Volcanic"},
  {name: "Gymnastic"}
])
User.create([
  {name: "Justin Menestrina", email: "user@example.com", password_digest: "$2a$10$K3HEBoshNWW5qMlAJ6Y31.FPep4miqbOC.3D8xsdctJMURFg/qn1a", session_token: "wuW3A5tGeIGjxhrPCBXfnw", location: "San Francisco, CA", lat: 37.7833, lng: -122.4167}
])
