# == Schema Information
#
# Table name: images
#
#  id            :integer          not null, primary key
#  image_url     :string
#  imagable_id   :integer
#  imagable_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  image_name    :string           not null
#

require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
