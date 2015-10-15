# == Schema Information
#
# Table name: reviews
#
#  id           :integer          not null, primary key
#  content      :text             not null
#  rating       :integer
#  adventure_id :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Review < ActiveRecord::Base
  validates :user_id, :adventure_id, :content, presence: true
  validates :rating, inclusion: { in: [1,2,3,4,5] }, allow_nil: true
  
  belongs_to :author, class_name: "User", primary_key: :id, foreign_key: :user_id
  belongs_to :adventure
end
