# == Schema Information
#
# Table name: adventure_likes
#
#  id           :integer          not null, primary key
#  adventure_id :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class AdventureLike < ActiveRecord::Base
  validates :user_id, :adventure_id, presence: true
  validates_uniqueness_of :user_id, scope: :adventure_id

  belongs_to :user 
  belongs_to :adventure
end
