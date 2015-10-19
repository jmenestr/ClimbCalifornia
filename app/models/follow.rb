class Follow < ActiveRecord::Base
  belongs_to :followed, class_name: "User", foreign_key: :followee_id
  belongs_to :follower, class_name: "User", foreign_key: :follower_id

  validates :followee_id, :follower_id, presence: true
  validates :follower_id, uniqueness: { scope: :followee_id }
end
