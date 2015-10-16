# == Schema Information
#
# Table name: adventure_activities
#
#  id           :integer          not null, primary key
#  adventure_id :integer
#  activity_id  :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class AdventureActivityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
