# == Schema Information
#
# Table name: follows
#
#  id          :integer          not null, primary key
#  followee_id :integer          not null
#  follower_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Follow < ActiveRecord::Base
  belongs_to :followed, class_name: "User", foreign_key: :followee_id
  belongs_to :follower, class_name: "User", foreign_key: :follower_id

  validates :followee_id, :follower_id, presence: true
  validates :follower_id, uniqueness: { scope: :followee_id }
end
