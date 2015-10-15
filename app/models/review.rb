class Review < ActiveRecord::Base
  validates :user_id, :adventure_id, :content, presence: true
  validates :rating, inclusion: { in: [1,2,3,4,5] }, allow_nil: true
  
  belongs_to :user 
  belongs_to :adventure
end
