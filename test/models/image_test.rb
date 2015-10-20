# == Schema Information
#
# Table name: images
#
#  id            :integer          not null, primary key
#  image_url     :string           default("http://res.cloudinary.com/climb-california/image/upload/v1445363827/rock_climbing_scene_1_x02odj.png")
#  imagable_id   :integer
#  imagable_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
