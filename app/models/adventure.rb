# == Schema Information
#
# Table name: adventures
#
#  id            :integer          not null, primary key
#  title         :string           not null
#  description   :text             not null
#  user_id       :integer          not null
#  lat           :float            not null
#  lng           :float            not null
#  location_name :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Adventure < ActiveRecord::Base
  validates :title, :description, :user_id, presence: true 
  validate :has_location
  validate :has_images, on: :create 

  acts_as_mappable
  has_many :images, as: :imagable, inverse_of: :imagable
  belongs_to :author, 
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :adventure_likes, dependent: :destroy
  has_many :saves, through: :adventure_likes, source: :user

  has_many :adventure_features
  has_many :features, through: :adventure_features
  has_many :adventure_activities 
  has_many :activities, through: :adventure_activities
  has_many :adventure_lists 
  has_many :lists, through: :adventure_lists
  has_many :reviews

  def self.search_filter(filter)
    northEast = filter[:positionBounds][:northEast].values
    southWest = filter[:positionBounds][:southWest].values
    adventures = self.in_bounds([southWest, northEast])
    if filter[:features]
      adventures = adventures.joins(:adventure_features)
      .where("adventure_features.feature_id": filter[:features])
    end
    if filter[:activities]
      adventures = adventures.joins(:adventure_activities)
      .where('adventure_activities.activity_id': filter[:activities])
    end
    adventures
  end

  private 
  def has_images
    errors.add(:images, "must exist") if self.images.length == 0
  end

  def has_location 
    errors.add(:location, "must not be blank") if (!self.lat || !self.lng)
  end
end

