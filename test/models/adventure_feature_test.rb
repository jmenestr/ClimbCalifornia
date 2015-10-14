# == Schema Information
#
# Table name: adventure_features
#
#  id           :integer          not null, primary key
#  adventure_id :integer          not null
#  feature_id   :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class AdventureFeatureTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
